# Generated by Django 4.0.3 on 2023-11-23 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='answer',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='question',
            field=models.TextField(),
        ),
        migrations.DeleteModel(
            name='Answer',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
    ]