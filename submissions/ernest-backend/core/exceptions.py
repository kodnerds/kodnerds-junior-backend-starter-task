from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    """Custom exception handler for consistent error responses"""

    # call REST framework's default exception handler first
    response = exception_handler(exc, context)

    if response is not None:
        # Customise the error respose
        response.data = {
            'error': "Request failed",
            'details': response.data,
            'status_code': response.status_code
        }
    else:
        # Handle uncaught exceptions
        response = Response(
            {
                'error': "server error",
                'message': str(exc),
                'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR
            }
        )

    return response
