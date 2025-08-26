import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, MapPin, Calendar, Trash2, Sparkles } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  hasLocation: boolean;
  dueDate?: string;
  location?: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Buy groceries at Whole Foods', completed: false, hasLocation: true, location: 'Whole Foods Market' },
    { id: '2', title: 'Book restaurant for dinner', completed: false, hasLocation: true, location: 'Downtown' },
    { id: '3', title: 'Research weekend trip destinations', completed: true, hasLocation: false },
    { id: '4', title: 'Pick up dry cleaning', completed: false, hasLocation: true, location: 'Main Street Cleaners' }
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo,
      completed: false,
      hasLocation: false
    };

    setTodos(prev => [todo, ...prev]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background mobile-padding pt-16 pb-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display gradient-text mb-4">To-Do List</h1>
        <p className="text-muted-foreground">
          Stay organized and get things done
        </p>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-500 drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 10px hsl(var(--accent) / 0.5))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{Math.round(progressPercentage)}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Todo */}
      <Card className="neumorphic-card border-border/20 mb-6">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="flex-1 border-none bg-transparent focus:ring-0"
            />
            <Button onClick={addTodo} className="btn-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="neumorphic-card border-border/20 text-center p-4">
          <div className="text-xl font-bold text-accent">{todos.length}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </Card>
        <Card className="neumorphic-card border-border/20 text-center p-4">
          <div className="text-xl font-bold text-primary">{todos.length - completedCount}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </Card>
        <Card className="neumorphic-card border-border/20 text-center p-4">
          <div className="text-xl font-bold text-green-500">{completedCount}</div>
          <div className="text-sm text-muted-foreground">Done</div>
        </Card>
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className={`neumorphic-card border-border/20 transition-all duration-300 hover:scale-105 ${
              todo.completed ? 'opacity-60' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                />
                
                <div className="flex-1">
                  <p className={`font-medium ${
                    todo.completed ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {todo.title}
                  </p>
                  
                  {todo.hasLocation && (
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className={`w-3 h-3 ${
                        todo.completed ? 'text-muted-foreground' : 'text-accent animate-pulse'
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {todo.location}
                      </span>
                    </div>
                  )}
                </div>

                {todo.hasLocation && !todo.completed && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-accent hover:bg-accent/10 accent-glow"
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                )}

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {todos.length === 0 && (
        <div className="text-center py-12">
          <div className="neumorphic-card p-8 max-w-md mx-auto">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-display font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              Add a new task to get started
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        onClick={() => document.querySelector<HTMLInputElement>('input')?.focus()}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full btn-glow shadow-lg z-40"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default TodoList;