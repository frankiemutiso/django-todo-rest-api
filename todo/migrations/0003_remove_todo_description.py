# Generated by Django 3.1.4 on 2020-12-11 11:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_auto_20201210_1451'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='description',
        ),
    ]
