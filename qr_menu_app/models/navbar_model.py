from django.db import models

class NavbarItem(models.Model):
    restoran_name = models.CharField(max_length=20)
    restoran_logo = models.ImageField(upload_to='restoran_logos/')


    def __str__(self):
        return self.restoran_name