from rest_framework import permissions


class IsOwnerAndDraftOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        # Semua user login boleh GET
        if request.method in permissions.SAFE_METHODS:
            return True

        # Admin TIDAK boleh edit/delete draft citizen
        if request.user.is_staff:
            return False

        # Citizen hanya boleh edit/delete draft miliknya sendiri
        return (
            obj.reporter == request.user
            and obj.status == 'DRAFT'
        )