import pytest
from rest_framework.status import (
    HTTP_401_UNAUTHORIZED,
    HTTP_200_OK,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)

@pytest.mark.django_db
class TestAuthentication:

    @staticmethod
    def test_if_user_is_anonymous_for_get_method_return_401(get_method_fixture):
        """
        This test checks if an anonymous (unauthenticated) user trying to access the
        GET method on questions and answers endpoints returns a 401 Unauthorized status.
        """
        question_endpoint = get_method_fixture('/api/forum/questions/')
        answer_endpoint = get_method_fixture('/api/forum/questions/1/answers/')

        assert answer_endpoint.status_code == HTTP_401_UNAUTHORIZED
        assert question_endpoint.status_code == HTTP_401_UNAUTHORIZED

    @staticmethod
    def test_if_is_authenticated_for_get_method_return_200(
        normal_user_authenticate_fixture,
        get_method_fixture):
        """  
        This test verifies if an authenticated user gets a 200 OK response when accessing 
        the GET method for both questions and answers.
        """
        normal_user_authenticate_fixture()

        question_endpoint = get_method_fixture('/api/forum/questions/')
        answer_endpoint = get_method_fixture('/api/forum/questions/1/answers/')

        assert answer_endpoint.status_code == HTTP_200_OK
        assert question_endpoint.status_code == HTTP_200_OK

    @staticmethod
    def test_if_anonymous_user_can_perform_post_method(
        normal_user_authenticate_fixture,
        post_method_fixture,
        ):
        """
        This test checks if an authenticated user can successfully create new
        questions and answers using the POST method, returning a 201 Created status.
        """
        normal_user_authenticate_fixture()

        data = {
            "title": "Some Question?",
            "description": "The Description for the question",
            "semester": '1st Semester',
        }

        question_endpoint = post_method_fixture('/api/forum/questions/', data)
        answer_endpoint = post_method_fixture(
            '/api/forum/questions/1/answers/',
            {"description": data["description"]}
        )

        assert answer_endpoint.status_code == HTTP_201_CREATED  
        assert question_endpoint.status_code == HTTP_201_CREATED  

    @staticmethod
    def test_if_user_is_authenticated_for_deletion_of_obj_they_created(
        normal_user_authenticate_fixture,
        delete_method_fixture):
        """
        This test checks if an authenticated user gets a 404 Not Found response when
        attempting to delete a non-existent question or answer.
        """
        normal_user_authenticate_fixture()

        answer_endpoint = delete_method_fixture('/api/forum/questions/1/answers/', 9)
        question_endpoint = delete_method_fixture('/api/forum/questions/', 9)

        assert answer_endpoint.status_code == HTTP_404_NOT_FOUND  
        assert question_endpoint.status_code == HTTP_404_NOT_FOUND  

    @staticmethod
    def test_if_normal_user_can_delete_something_they_didnt_create_return_403(
        normal_user_authenticate_fixture,
        delete_method_fixture,
        create_normal_user_obj):
        """
        This test checks if a normal authenticated user is forbidden (403 status)
        from deleting an object (question) they didn't create.
        """
        question = create_normal_user_obj()

        normal_user_authenticate_fixture()

        response = delete_method_fixture(f'/api/forum/questions', question.id)

        assert response.status_code == HTTP_403_FORBIDDEN

    @staticmethod
    def test_if_admin_user_can_delete_something_they_didnt_create_return_204(
        admin_user_authenticated_fixture,
        delete_method_fixture,
        create_normal_user_obj):    
        """
        This test verifies that an admin user is allowed (204 No Content status)
        to delete an object (question) created by another user.
        """
        question = create_normal_user_obj()

        admin_user_authenticated_fixture()

        response = delete_method_fixture(f'/api/forum/questions', question.id)

        assert response.status_code == HTTP_204_NO_CONTENT


    @staticmethod
    def test_if_authenticated_user_can_like_obj_return_200(
        normal_user_authenticate_fixture,
        post_method_fixture,
        create_normal_user_obj
    ):
        """ 
        This test ensures that only authenticated user can perform 
        like (post method) which return 200 status code and when a user again 
        use post method on already like obj its needs to return 400 status code 
        """
        question=create_normal_user_obj()
        normal_user_authenticate_fixture()

        response=post_method_fixture(f'/api/forum/questions/{question.id}/like/',{})
        assert response.status_code == HTTP_201_CREATED

        response=post_method_fixture(f'/api/forum/questions/{question.id}/like/',{})
        assert response.status_code == HTTP_400_BAD_REQUEST

