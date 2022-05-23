# Generated by Django 3.2.12 on 2022-05-22 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_auto_20220520_1624'),
        ('accounts', '0002_user_nickname'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='watch_movie',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='movies.movie'),
        ),
    ]