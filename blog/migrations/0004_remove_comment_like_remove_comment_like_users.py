# Generated by Django 4.0.3 on 2023-11-24 02:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_remove_comment_parent_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='like',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='like_users',
        ),
    ]
