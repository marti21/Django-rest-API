# Generated by Django 3.2.5 on 2022-05-21 09:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pangolin', '0024_alter_userpangolin_my_date_field'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpangolin',
            name='my_date_field',
            field=models.DateField(default=datetime.date(2022, 5, 21)),
        ),
    ]
