import csv
from django.core.management.base import BaseCommand
from api.models import NSECompany

class Command(BaseCommand):
    help = 'Load companies from CSV into the database'

    def handle(self, *args, **kwargs):
        with open(r"EQUITY_L.csv", mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                symbol = row['SYMBOL']
                name = row['NAME OF COMPANY']
                NSECompany.objects.update_or_create(symbol=symbol, defaults={'name': name})
        self.stdout.write(self.style.SUCCESS('Successfully loaded companies into the database'))