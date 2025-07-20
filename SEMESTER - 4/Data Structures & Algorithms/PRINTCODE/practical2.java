/* PRACTICAL-2: Implementation of Array applications of Sparse Matrices.

Name: Angat Shah
Enrollment No: 202203103510097
Branch: B.Tech Computer Science and Engineering */

// CODE:

import java.util.ArrayList;

class SparseMatrix {
    private int rows;
    private int columns;
    private ArrayList<SparseMatrixElement> elements;

    public SparseMatrix(int rows, int columns) {
        this.rows = rows;
        this.columns = columns;
        this.elements = new ArrayList<>();
    }

    public void setElement(int row, int col, int value) {
        if (row < 0 || row >= rows || col < 0 || col >= columns) {
            throw new IllegalArgumentException("Invalid matrix indices");
        }

        elements.removeIf(element -> element.getRow() == row && element.getColumn() == col);

        if (value != 0) {
            elements.add(new SparseMatrixElement(row, col, value));
        }
    }

    public int getElement(int row, int col) {
        if (row < 0 || row >= rows || col < 0 || col >= columns) {
            throw new IllegalArgumentException("Invalid matrix indices");
        }

        for (SparseMatrixElement element : elements) {
            if (element.getRow() == row && element.getColumn() == col) {
                return element.getValue();
            }
        }

        return 0;
    }

    public void printMatrix() {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                System.out.print(getElement(i, j) + " ");
            }
            System.out.println();
        }
    }
}

class SparseMatrixElement {
    private int row;
    private int column;
    private int value;

    public SparseMatrixElement(int row, int column, int value) {
        this.row = row;
        this.column = column;
        this.value = value;
    }

    public int getRow() {
        return row;
    }

    public int getColumn() {
        return column;
    }

    public int getValue() {
        return value;
    }
}

public class practical2 {
    public static void main(String[] args) {
        SparseMatrix sparseMatrix = new SparseMatrix(3, 3);

        System.out.println("--> Generated Sparse Matrix on the Given Input: ");
        sparseMatrix.setElement(0, 0, 1);
        sparseMatrix.setElement(1, 1, 2);
        sparseMatrix.setElement(2, 2, 3);

        sparseMatrix.printMatrix();
    }
}