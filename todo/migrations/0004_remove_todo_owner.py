# Generated by Django 3.1.4 on 2020-12-11 13:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_remove_todo_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='owner',
        ),
    ]
