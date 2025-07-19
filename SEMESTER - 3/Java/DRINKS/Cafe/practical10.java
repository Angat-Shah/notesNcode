package Cafe;

import Special.ChaiTea;

public class practical10 {
    public static void main(String[] args) {
        Beverage basicBeverage = new Beverage();
        Coffee coffee = new Coffee();
        Tea tea = new Tea();
        ChaiTea chaiTea = new ChaiTea();

        System.out.println("Basic Beverage:");
        basicBeverage.prepare();

        System.out.println("\nCoffee:");
        coffee.prepare();
        coffee.addCream();

        System.out.println("\nTea:");
        tea.prepare();
        tea.addLemon();

        System.out.println("\nChai Tea:");
        chaiTea.prepare();
    }
}