from .models import Question,Answer
from rest_framework import serializers 


# ! Serializer For Question 
class QuestionSerailizer(serializers.ModelSerializer):
    user=serializers.StringRelatedField()
    likes=serializers.IntegerField(read_only=True)
    is_liked=serializers.BooleanField(read_only=True)


    class Meta:
        model=Question
        fields=[
            'id',
            'user',
            'title',
            'is_liked',
            'likes',
            'time_stamp',
            'semester'
        ]


    def create(self, validated_data):
        """
        Overriding the create method to create a
        new question instance
        """
        user_id=self.context['user_id']
        return Question.objects.create(
            user_id=user_id,
            **validated_data
        )




# ! Serailizer For Question Answer
class AnswerSerailizer(serializers.ModelSerializer):
    user=serializers.StringRelatedField()
    likes=serializers.IntegerField(read_only=True)
    is_liked=serializers.BooleanField(read_only=True)


    class Meta:
        model=Answer
        fields=[
            'id',
            'user',
            'is_liked',
            'likes',
            'time_stamp',
            'description',
        ]


    def create(self, validated_data):
        """
        Overriding the create method to create 
        a answer instance
        """
        question_id=self.context['question_id']
        user_id=self.context['user_id']

        return Answer.objects.create(
            user_id=user_id,
            question_id=question_id,
            **validated_data
        )



# ! EmptySerailizer
class EmptySerializer(serializers.Serializer):
    pass