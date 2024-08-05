from django.db import migrations

# def populate_default_diagnostics(apps, schema_editor):
#     Diagnostic = apps.get_model('clinic', 'Diagnostic')
#     default_diagnostics = [
#     'Cavité', 'Gingivite', 'Parodontite', 'Abcès', 'Douleur dentaire', 'Bruxisme', 
#     'Halitose', 'ATM', 'Cancer buccal', 'Xérostomie', 'Sensibilité dentaire', 'Aphtes', 
#     'Candidose buccale', 'Érosion dentaire', 'Caries dentaires', 'Perte de dents', 
#     'Décoloration des dents', 'Fracture dentaire', 'Abcès dentaire', 'Douleur dentaire', 
#     'Sensibilité dentaire', 'Plaque dentaire', 'Pulpite', 'Nécrose pulpaire', 'Hypersensibilité dentinaire', 
#     'Mauvaise haleine', 'Lésion carieuse', 'Mobilité dentaire', 'Rétention alimentaire', 'Récession gingivale'
# ]
#     for diagnostic in default_diagnostics:
#         Diagnostic.objects.get_or_create(name=diagnostic)

class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0001_initial'),
    ]

    # operations = [
    #     migrations.RunPython(populate_default_diagnostics),
    # ]