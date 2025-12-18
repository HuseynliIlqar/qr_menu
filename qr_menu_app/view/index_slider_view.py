from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST


#
# @login_required
# @require_POST
# def (request, pk):
#     pass





@login_required
@require_POST
def delete_index_slider(request, pk):
    pass
