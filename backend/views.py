from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from backend.numerical_methods import (
    bisection_method,
    newton_raphson,
    finite_differences,
    calculate_error,
    newton_forward_difference
)


@api_view(['POST'])
def bisection_view(request):
    """API endpoint for bisection method"""
    try:
        func_str = request.data.get('function')
        a = float(request.data.get('a'))
        b = float(request.data.get('b'))
        tolerance = float(request.data.get('tolerance', 1e-6))
        
        result = bisection_method(func_str, a, b, tolerance)
        
        if 'error' in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def newton_raphson_view(request):
    """API endpoint for Newton-Raphson method"""
    try:
        func_str = request.data.get('function')
        x0 = float(request.data.get('x0'))
        tolerance = float(request.data.get('tolerance', 1e-6))
        
        result = newton_raphson(func_str, x0, tolerance)
        
        if 'error' in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def finite_differences_view(request):
    """API endpoint for finite differences"""
    try:
        # Check if function mode or data mode
        func_str = request.data.get('function')
        
        if func_str:
            # Function mode
            x_val = request.data.get('x_value')
            h = request.data.get('h', 0.1)
            
            result = finite_differences(
                func_str=func_str,
                x_val=float(x_val) if x_val else None,
                h=float(h)
            )
        else:
            # Data mode
            x_vals = request.data.get('x_values')
            y_vals = request.data.get('y_values')
            h = request.data.get('h', None)
            
            result = finite_differences(
                x_vals=x_vals,
                y_vals=y_vals,
                h=float(h) if h else None
            )
        
        if 'error' in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def error_calculation_view(request):
    """API endpoint for error calculation"""
    try:
        true_value = request.data.get('true_value')
        approximate_value = request.data.get('approximate_value')
        
        result = calculate_error(true_value, approximate_value)
        
        if 'error' in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def newton_forward_diff_view(request):
    """API endpoint for Newton's forward difference interpolation"""
    try:
        x_vals = request.data.get('x_values')
        y_vals = request.data.get('y_values')
        x_target = float(request.data.get('x_target'))
        
        result = newton_forward_difference(x_vals, y_vals, x_target)
        
        if 'error' in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

