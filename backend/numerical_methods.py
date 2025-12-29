import numpy as np
from sympy import symbols, sympify, lambdify, diff


def bisection_method(func_str, a, b, tolerance=1e-6, max_iterations=100):
    """
    Bisection method to find root of a function.
    Returns dict with result, iterations, and steps.
    """
    x = symbols('x')
    try:
        func = sympify(func_str)
        f = lambdify(x, func, 'numpy')
    except Exception as e:
        return {"error": f"Invalid function: {str(e)}"}
    
    steps = []
    fa = f(a)
    fb = f(b)
    
    if fa * fb > 0:
        return {"error": "f(a) and f(b) must have opposite signs"}
    
    for i in range(max_iterations):
        c = (a + b) / 2
        fc = f(c)
        
        steps.append({
            "iteration": i + 1,
            "a": float(a),
            "b": float(b),
            "c": float(c),
            "f_c": float(fc),
            "error": abs(b - a) / 2
        })
        
        if abs(fc) < tolerance or abs(b - a) / 2 < tolerance:
            return {
                "root": float(c),
                "iterations": i + 1,
                "steps": steps,
                "formula": "c = (a + b) / 2"
            }
        
        if f(a) * fc < 0:
            b = c
        else:
            a = c
    
    return {"error": "Maximum iterations reached"}


def newton_raphson(func_str, x0, tolerance=1e-6, max_iterations=100):
    """
    Newton-Raphson method to find root of a function.
    Returns dict with result, iterations, and steps.
    """
    x = symbols('x')
    try:
        func = sympify(func_str)
        f = lambdify(x, func, 'numpy')
        df = lambdify(x, diff(func, x), 'numpy')
    except Exception as e:
        return {"error": f"Invalid function: {str(e)}"}
    
    steps = []
    x_n = x0
    
    for i in range(max_iterations):
        fx = f(x_n)
        dfx = df(x_n)
        
        if abs(dfx) < 1e-10:
            return {"error": "Derivative too small, method fails"}
        
        x_next = x_n - fx / dfx
        
        steps.append({
            "iteration": i + 1,
            "x_n": float(x_n),
            "f_x": float(fx),
            "df_x": float(dfx),
            "x_next": float(x_next),
            "error": abs(x_next - x_n)
        })
        
        if abs(x_next - x_n) < tolerance:
            return {
                "root": float(x_next),
                "iterations": i + 1,
                "steps": steps,
                "formula": "x_{n+1} = x_n - f(x_n) / f'(x_n)"
            }
        
        x_n = x_next
    
    return {"error": "Maximum iterations reached"}


def finite_differences(func_str=None, x_val=None, h=0.1, x_vals=None, y_vals=None):
    """
    Calculate finite differences (forward, backward, central).
    Can work in two modes:
    1. Function mode: provide func_str, x_val, h
    2. Data mode: provide x_vals, y_vals
    Returns dict with all three types of derivatives.
    """
    x = symbols('x')
    
    # Function mode
    if func_str is not None:
        try:
            func = sympify(func_str)
            f = lambdify(x, func, 'numpy')
            
            if x_val is None:
                return {"error": "x_val required when using function mode"}
            
            x_val = float(x_val)
            h = float(h)
            
            # Calculate all three types
            forward_deriv = (f(x_val + h) - f(x_val)) / h
            backward_deriv = (f(x_val) - f(x_val - h)) / h
            central_deriv = (f(x_val + h) - f(x_val - h)) / (2 * h)
            
            # True derivative using sympy
            true_deriv_expr = diff(func, x)
            true_deriv_func = lambdify(x, true_deriv_expr, 'numpy')
            true_deriv = float(true_deriv_func(x_val))
            
            return {
                "function": func_str,
                "x": float(x_val),
                "h": float(h),
                "true_derivative": true_deriv,
                "forward": {
                    "value": float(forward_deriv),
                    "error": abs(true_deriv - float(forward_deriv)),
                    "formula": "f'(x) ≈ (f(x+h) - f(x)) / h"
                },
                "backward": {
                    "value": float(backward_deriv),
                    "error": abs(true_deriv - float(backward_deriv)),
                    "formula": "f'(x) ≈ (f(x) - f(x-h)) / h"
                },
                "central": {
                    "value": float(central_deriv),
                    "error": abs(true_deriv - float(central_deriv)),
                    "formula": "f'(x) ≈ (f(x+h) - f(x-h)) / (2h)"
                }
            }
        except Exception as e:
            return {"error": f"Invalid function: {str(e)}"}
    
    # Data mode (original behavior)
    elif x_vals is not None and y_vals is not None:
        x_vals = np.array(x_vals, dtype=float)
        y_vals = np.array(y_vals, dtype=float)
        
        if len(x_vals) != len(y_vals):
            return {"error": "x and y arrays must have same length"}
        
        if h is None:
            h = x_vals[1] - x_vals[0] if len(x_vals) > 1 else 1.0
        
        # Calculate for all points where possible
        results = []
        
        for i in range(len(x_vals)):
            point_result = {"x": float(x_vals[i])}
            
            # Forward
            if i < len(x_vals) - 1:
                point_result["forward"] = float((y_vals[i + 1] - y_vals[i]) / h)
            
            # Backward
            if i > 0:
                point_result["backward"] = float((y_vals[i] - y_vals[i - 1]) / h)
            
            # Central  
            if i > 0 and i < len(x_vals) - 1:
                point_result["central"] = float((y_vals[i + 1] - y_vals[i - 1]) / (2 * h))
            
            results.append(point_result)
        
        return {
            "h": float(h),
            "results": results,
            "formulas": {
                "forward": "f'(x) ≈ (f(x+h) - f(x)) / h",
                "backward": "f'(x) ≈ (f(x) - f(x-h)) / h",
                "central": "f'(x) ≈ (f(x+h) - f(x-h)) / (2h)"
            }
        }
    else:
        return {"error": "Must provide either func_str OR (x_vals and y_vals)"}



def calculate_error(true_value, approximate_value):
    """
    Calculate absolute and relative errors.
    """
    try:
        true_value = float(true_value)
        approximate_value = float(approximate_value)
        
        absolute_error = abs(true_value - approximate_value)
        
        if abs(true_value) > 1e-10:
            relative_error = absolute_error / abs(true_value)
            percentage_error = relative_error * 100
        else:
            relative_error = float('inf')
            percentage_error = float('inf')
        
        return {
            "absolute_error": float(absolute_error),
            "relative_error": float(relative_error),
            "percentage_error": float(percentage_error),
            "formulas": {
                "absolute": "|true - approximate|",
                "relative": "|true - approximate| / |true|",
                "percentage": "relative_error × 100%"
            }
        }
    except Exception as e:
        return {"error": f"Error calculation failed: {str(e)}"}


def newton_forward_difference(x_vals, y_vals, x_target):
    """
    Newton's Forward Difference Interpolation with derivatives.
    Returns interpolated value, 1st derivative, 2nd derivative, and difference table.
    """
    x_vals = np.array(x_vals, dtype=float)
    y_vals = np.array(y_vals, dtype=float)
    
    if len(x_vals) != len(y_vals):
        return {"error": "x and y arrays must have same length"}
    
    n = len(y_vals)
    
    # Create forward difference table
    diff_table = np.zeros((n, n))
    diff_table[:, 0] = y_vals
    
    for j in range(1, n):
        for i in range(n - j):
            diff_table[i, j] = diff_table[i + 1, j - 1] - diff_table[i, j - 1]
    
    # Check if points are equally spaced
    h = x_vals[1] - x_vals[0]
    if not np.allclose(np.diff(x_vals), h):
        return {"error": "Points must be equally spaced for Newton's forward difference"}
    
    # Calculate u
    u = (x_target - x_vals[0]) / h
    
    # Newton's forward interpolation for f(x)
    result = diff_table[0, 0]
    u_term = 1
    
    for i in range(1, n):
        u_term *= (u - i + 1) / i
        result += u_term * diff_table[0, i]
    
    # First derivative: f'(x) = (1/h)[Δf₀ + (2u-1)/2! Δ²f₀ + (3u²-6u+2)/3! Δ³f₀ + ...]
    # Simplified: f'(x) ≈ (1/h)[Δf₀ + (2u-1)/2 Δ²f₀ + (3u²-6u+2)/6 Δ³f₀]
    first_deriv = 0
    if n > 1:
        first_deriv = diff_table[0, 1]  # Δf₀
        if n > 2:
            first_deriv += (2*u - 1) / 2 * diff_table[0, 2]  # (2u-1)/2! Δ²f₀
        if n > 3:
            first_deriv += (3*u**2 - 6*u + 2) / 6 * diff_table[0, 3]  # (3u²-6u+2)/3! Δ³f₀
        first_deriv = first_deriv / h
    
    # Second derivative: f''(x) = (1/h²)[Δ²f₀ + (u-1) Δ³f₀ + (12u²-36u+22)/12 Δ⁴f₀]
    second_deriv = 0
    if n > 2:
        second_deriv = diff_table[0, 2]  # Δ²f₀
        if n > 3:
            second_deriv += (u - 1) * diff_table[0, 3]  # (u-1) Δ³f₀
        if n > 4:
            second_deriv += (12*u**2 - 36*u + 22) / 12 * diff_table[0, 4]
        second_deriv = second_deriv / (h**2)
    
    # Format difference table for output
    table_rows = []
    for i in range(n):
        row = {"x": float(x_vals[i])}
        for j in range(n - i):
            row[f"Δ^{j}y"] = float(diff_table[i, j])
        table_rows.append(row)
    
    return {
        "interpolated_value": float(result),
        "first_derivative": float(first_deriv),
        "second_derivative": float(second_deriv),
        "x_target": float(x_target),
        "u": float(u),
        "h": float(h),
        "difference_table": table_rows,
        "formulas": {
            "interpolation": "f(x) = f(x₀) + uΔf(x₀) + u(u-1)/2! Δ²f(x₀) + ...",
            "first_derivative": "f'(x) = (1/h)[Δf₀ + (2u-1)/2 Δ²f₀ + ...]",
            "second_derivative": "f''(x) = (1/h²)[Δ²f₀ + (u-1) Δ³f₀ + ...]"
        }
    }

