import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from forum.models import Question

User=get_user_model()

@pytest.fixture
def create_normal_user():
    def create_user():
        user = User.objects.create_user(
            username='owner_user',
            email='owner@example.com',
            password='password'
        )
        return user 
    return create_user

@pytest.fixture
def create_normal_user_obj():
    def create():
        user = User.objects.create_user(
            username='owner_user',
            email='owner@example.com',
            password='password'
        )
    
        question = Question.objects.create(
            title="Some Question?",
            description="The Description for the question",
            semester="1st Semester",
            user=user
        )
        return question
    return create

@pytest.fixture 
def api_client():
    return APIClient()

@pytest.fixture
def normal_user_authenticate_fixture(api_client):
    def authenticate():
        user=User.objects.create(
            first_name="testname",
            last_name="testname",
            username='test_user',
            email='test@example.com',
            password='password'    
        )
        api_client.force_authenticate(user=user)
        return user 
    return authenticate

@pytest.fixture
def admin_user_authenticated_fixture(api_client):
    def authenticate():
        user = User.objects.create_user(
            first_name="testname",
            last_name="testname",
            username='user_admin',
            email='test_admin@example.com',
            password='password',
            is_staff=True
        )
        api_client.force_authenticate(user=user)
        return user 
    return authenticate


@pytest.fixture 
def get_method_fixture(api_client):
    def make_request(url):
        return api_client.get(url)
    return make_request



@pytest.fixture
def delete_method_fixture(api_client):
    def  make_request(url,id):
        return api_client.delete(f"{url}/{id}/")
    return make_request

@pytest.fixture
def post_method_fixture(api_client):
    def make_request(url, data):
        return api_client.post(url, data, format='json')
    return make_request

    






