/* PRACTICAL-1: Implementation of Array operations - Insert, Delete, Search, Update, and Display.

Name: Angat Shah
Enrollment No: 202203103510097
Branch: B.Tech Computer Science and Engineering */

// CODE:

public class practical1 {
    private int[] array;
    private int size;

    public practical1(int length) {
        array = new int[length];
        size = 0;
    }

    public void insert(int value) {
        if (size < array.length) {
            array[size] = value;
            size++;
        } else {
            System.out.println("Array is full. Cannot insert " + value);
        }
    }

    public void delete(int index) {
        if (index >= 0 && index < size) {
            for (int i = index; i < size - 1; i++) {
                array[i] = array[i + 1];
            }
            size--;
        } else {
            System.out.println("Invalid index. Cannot delete from " + index);
        }
    }

    public int search(int value) {
        for (int i = 0; i < size; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return -1;
    }

    public void update(int index, int value) {
        if (index >= 0 && index < size) {
            array[index] = value;
        } else {
            System.out.println("Invalid index. Cannot update " + index);
        }
    }

    public void display() {
        for (int i = 0; i < size; i++) {
            System.out.print(array[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        practical1 array = new practical1(5);
        array.insert(1);
        array.insert(5);
        array.insert(7);
        array.insert(8);
        array.insert(11);
        System.out.print("--> Given Array: ");
        array.display();

        array.delete(2);
        System.out.print("--> After Deleting '5' from the Array: ");
        array.display();

        array.update(3, 30);
        System.out.print("--> After Updating the element at '3rd' Index to '30' in the Array: ");
        array.display();

        System.out.println("--> Index of '11': " + array.search(30));
    }
}