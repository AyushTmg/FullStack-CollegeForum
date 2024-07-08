from django.db import models
from django.conf import settings



# ! Models For Raising Question In The Forum
class Question(models.Model):
    SEMESTER_CHOICES = [
        ('1st Semester', '1st Semester'),
        ('2nd Semester', '2nd Semester'),
        ('3rd Semester', '3rd Semester'),
        ('4th Semester', '4th Semester'),
        ('5th Semester', '5th Semester'),
        ('6th Semester', '6th Semester'),
        ('7th Semester', '7th Semester'),
        ('8th Semester', '8th Semester'),
    ]
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=200)
    time_stamp=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='question')
    is_liked=models.BooleanField(default=False)
    likes=models.IntegerField(default=0,null=True,blank=True)
    semester = models.CharField(max_length=15, choices=SEMESTER_CHOICES)


    def __str__(self) -> str:
        """
        Retruns String Format For Question Module
        """
        return self.title
    



# ! Models For Answering Forums Questions 
class Answer(models.Model):
    description=models.CharField(max_length=100)
    time_stamp=models.DateTimeField(auto_now_add=True)
    question=models.ForeignKey(Question,on_delete=models.CASCADE,related_name='answer')
    is_liked=models.BooleanField(default=False)
    likes=models.IntegerField(default=0,null=True,blank=True)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='answer')




# !Like  Model Answer
class AnswerLike(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('answer', 'user')




# !Like  Model Question
class QuestionLike(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('question', 'user')



