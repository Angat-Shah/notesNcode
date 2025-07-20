/* PRACTICAL-3: Implement a program for stack that performs following operations using array. 
(a) PUSH (b) POP (c) PEEP (d) CHANGE (e) DISPLAY

Name: Angat Shah
Enrollment No: 202203103510097
Branch: B.Tech Computer Science and Engineering */

// CODE:

public class practical3 {
    private int maxSize;
    private int top;
    private int[] stackArray;

    public practical3(int size) {
        this.maxSize = size;
        this.stackArray = new int[maxSize];
        this.top = -1;
    }

    public void push(int value) {
        if (top < maxSize - 1) {
            top++;
            stackArray[top] = value;
            System.out.println("--> Pushed: " + value);
        } else {
            System.out.println("--> Stack is full. Cannot push: " + value);
        }
    }

    public void pop() {
        if (top >= 0) {
            System.out.println("--> Popped: " + stackArray[top]);
            top--;
        } else {
            System.out.println("--> Stack is empty.");
        }
    }

    public void peek() {
        if (top >= 0) {
            System.out.println("--> Top element: " + stackArray[top]);
        } else {
            System.out.println("--> Stack is empty.");
        }
    }

    public void change(int value, int newValue) {
        boolean found = false;
        if (top >= 0) {
            for (int i = 0; i <= top; i++) {
                if (stackArray[i] == value) {
                    stackArray[i] = newValue;
                    System.out.println("--> Value changed from " + value + " TO " + newValue);
                    found = true;
                    break;
                }
            }
            if (!found) {
                System.out.println("--> Value not found in stack.");
            }
        } else {
            System.out.println("--> Stack is empty.");
        }
    }

    public void display() {
        if (top >= 0) {
            System.out.print("--> Stack: [");
            for (int i = 0; i <= top; i++) {
                System.out.print(stackArray[i] + " ");
            }
            System.out.println("]");
        } else {
            System.out.println("--> Stack is empty.");
        }
    }

    public static void main(String[] args) {
        practical3 stack = new practical3(5);

        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);
        stack.push(50);
        stack.display();

        stack.push(60);
        stack.pop();
        stack.pop();
        stack.display();

        stack.peek();
        stack.change(30, 300);
        stack.display();
        
        stack.change(100, 1000);
    }
}