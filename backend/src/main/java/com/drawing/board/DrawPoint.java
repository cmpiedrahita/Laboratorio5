package com.drawing.board;

public class DrawPoint {
    private double x;
    private double y;
    private String color;
    private String action;

    public DrawPoint() {}

    public DrawPoint(double x, double y, String color, String action) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.action = action;
    }

    public double getX() { return x; }
    public void setX(double x) { this.x = x; }
    
    public double getY() { return y; }
    public void setY(double y) { this.y = y; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
}
