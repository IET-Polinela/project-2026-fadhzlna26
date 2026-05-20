from rest_framework import permissions


class IsOwnerAndDraftOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        # Semua user yang login boleh lihat data
        if request.method in permissions.SAFE_METHODS:
            return True

        # Admin boleh update status report
        if request.user.is_staff:
            return True

        # Citizen hanya boleh edit/delete draft miliknya sendiri
        return (
            obj.reporter == request.user
            and obj.status == 'DRAFT'
        )