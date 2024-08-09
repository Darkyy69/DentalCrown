# from django.db.models.signals import pre_save
# from django.dispatch import receiver
# from django.core.exceptions import ValidationError
# from .models import Appointment

# @receiver(pre_save, sender=Appointment)
# def validate_treatment_patient_relation(sender, instance, **kwargs):
#     if instance.treatment and instance.treatment.patient != instance.patient:
#         raise ValidationError('The treatment does not belong to the selected patient.')


from django.db.models.signals import pre_save, post_migrate, post_save
from django.dispatch import receiver
from django.utils import timezone
from notification.models import PaymentNotification, ContentType
from django.contrib.auth import get_user_model
from clinic.models import Tooth, Diagnostic, DentalService, SubCategoryService, Speciality, SubSubCategoryService, Payment, Appointment, Treatment
from clinic.dummy_data import create_dummy_data

User = get_user_model()

@receiver(post_migrate)
def populate_default_diagnostics(sender, **kwargs):
    if sender.name == 'clinic':
        default_diagnostics = [
            'Cavité', 'Gingivite', 'Parodontite', 'Abcès', 'Douleur dentaire', 'Bruxisme', 
            'Halitose', 'ATM', 'Cancer buccal', 'Xérostomie', 'Sensibilité dentaire', 'Aphtes', 
            'Candidose buccale', 'Érosion dentaire', 'Caries dentaires', 'Perte de dents', 
            'Décoloration des dents', 'Fracture dentaire', 'Abcès dentaire', 'Douleur dentaire', 
            'Sensibilité dentaire', 'Plaque dentaire', 'Pulpite', 'Nécrose pulpaire', 'Hypersensibilité dentinaire', 
            'Mauvaise haleine', 'Lésion carieuse', 'Mobilité dentaire', 'Rétention alimentaire', 'Récession gingivale'
        ]
        for diagnostic in default_diagnostics:
            Diagnostic.objects.get_or_create(name=diagnostic)
        
        print("diagnosteirj b1 ")

@receiver(post_migrate)
def populate_default_specialities(sender, **kwargs):
    if sender.name == 'clinic':
        default_specialities = [
            'Omnipratique','Chirurgie', 'Orthodontologie', 'Parodontologie', 'Implantologie', 'Prothèse', 'Esthetique', 'Radiologie', 'Eclaircissement', 'Endodontie', 'Restauratrice'
        ]
        for speciality in default_specialities:
            Speciality.objects.get_or_create(name=speciality)
        print("specialities b1")

@receiver(post_migrate)
def populate_default_services(sender, **kwargs):
    if sender.name == 'clinic':

        default_services = [
            {"speciality": "Omnipratique", "name": "Consultation générale", "description": "Consultation générale", "has_subcategories": False},
            {"speciality": "Omnipratique", "name": "Détartrage", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Reprise de soin", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Consultation spécialisée", "description": "", "has_subcategories": False},
            {"speciality": "Omnipratique", "name": "Examen radiologique", "description": "", "has_subcategories": False},
            {"speciality": "Omnipratique", "name": "Analyse esthétique", "description": "", "has_subcategories": False},
            {"speciality": "Omnipratique", "name": "Implantologie", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Orthodontie", "description": "", "has_subcategories": False},
            {"speciality": "Omnipratique", "name": "Controle", "description": "", "has_subcategories": False},
            {"speciality": "Omnipratique", "name": "Urgence", "description": "", "has_subcategories": False},
            {"speciality": "Omnipratique", "name": "Eclaircissement", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Prothèse amovible", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Prothèse fixée", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Soin Composite", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Soin Amalgamme", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Traitement de racine", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Reprise de traitement de racine", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Reconstitution", "description": "", "has_subcategories": True},
            {"speciality": "Omnipratique", "name": "Extraction", "description": "", "has_subcategories": True},


            {"speciality": "Chirurgie", "name": "Avulsions", "description": "", "has_subcategories": True},
            {"speciality": "Chirurgie", "name": "Osteotomie", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Avulsions: dents de sagesse", "description": "", "has_subcategories": True},
            {"speciality": "Chirurgie", "name": "Résection apicale", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Exérèse d’une tumeur bénigne de la muqueuse buccale", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Exérèse d'un odontome", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Désinclusion ortho chirurgicale d'une dent", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Freinectomie", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Freinectomie au laser", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Enucléation kystique", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Régularisation des crêtes", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Exérèse des crêtes flottantes", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Gingivectomie/Gingivoplastie", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Élongation coronaire", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Curetage alvéolaire", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Ablation du fil", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Curetage périapical", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Ablation d'un calcul lithiasique", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Fermeture d'une communication bucco sinusienne", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Gingivectomie par laser", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Corticotomie mandibulaire", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Corticotomie maxillaire", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Désinclusion ortho-chirurgicale", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Exérèse d'une lésion bénigne", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Extraction chirurgicale", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Germectomie", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Curetage", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Énucléation", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Rigide", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Semi-rigide", "description": "", "has_subcategories": False},
            {"speciality": "Chirurgie", "name": "Plaque d'osthéosynthèse", "description": "", "has_subcategories": False},

            # TODO: Continue from Parodontologie

      
        ]
        for service in default_services:
            speciality = Speciality.objects.get(name=service['speciality'])
            DentalService.objects.get_or_create(speciality=speciality, name=service['name'], description=service['description'], has_subcategories=service['has_subcategories'])


@receiver(post_migrate)
def populate_default_subcategories(sender, **kwargs):
    if sender.name == 'clinic':  # Replace with your app name
        default_subcategories = [
            {"category": "Détartrage", "name": "Détartrage A", "description": "", "has_subcategories": False},
            {"category": "Détartrage", "name": "Détartrage B", "description": "", "has_subcategories": False},
            {"category": "Reprise de soin", "name": "Classe 1", "description": "", "has_subcategories": False},
            {"category": "Reprise de soin", "name": "Classe 2", "description": "", "has_subcategories": True},
            {"category": "Reprise de soin", "name": "Classe 3", "description": "", "has_subcategories": True},
            {"category": "Reprise de soin", "name": "Classe 4", "description": "", "has_subcategories": True},
            {"category": "Reprise de soin", "name": "Classe 5", "description": "", "has_subcategories": False},
            {"category": "Implantologie", "name": "Antérieur", "description": "", "has_subcategories": False},
            {"category": "Implantologie", "name": "Postérieur", "description": "", "has_subcategories": False},
            {"category": "Implantologie", "name": "Régénération osseuse guidée", "description": "", "has_subcategories": False},
            {"category": "Eclaircissement", "name": "Ambulatoire", "description": "", "has_subcategories": False},
            {"category": "Eclaircissement", "name": "Fauteuil", "description": "", "has_subcategories": False},
            {"category": "Prothèse amovible", "name": "Forfait resine", "description": "", "has_subcategories": False},
            {"category": "Prothèse amovible", "name": "Immédiate", "description": "", "has_subcategories": False},
            {"category": "Prothèse amovible", "name": "Partielle", "description": "", "has_subcategories": False},
            {"category": "Prothèse amovible", "name": "Rebasage", "description": "", "has_subcategories": False},
            {"category": "Prothèse amovible", "name": "Stellite", "description": "", "has_subcategories": False},
            {"category": "Prothèse amovible", "name": "Totale", "description": "", "has_subcategories": False},
            {"category": "Prothèse amovible", "name": "Totale stabilisée sur implant", "description": "", "has_subcategories": False},
            {"category": "Prothèse fixée", "name": "Nettoyage de bridge", "description": "", "has_subcategories": False},
            {"category": "Prothèse fixée", "name": "Couronne", "description": "", "has_subcategories": True},
            {"category": "Prothèse fixée", "name": "Couronne temporaire", "description": "", "has_subcategories": False},
            {"category": "Prothèse fixée", "name": "Facette", "description": "", "has_subcategories": False},
            {"category": "Prothèse fixée", "name": "Overlay", "description": "", "has_subcategories": False},
            {"category": "Prothèse fixée", "name": "Wax-up/Mock-up", "description": "", "has_subcategories": False},
            {"category": "Soin Composite", "name": "Classe 1", "description": "", "has_subcategories": False},
            {"category": "Soin Composite", "name": "Classe 2", "description": "", "has_subcategories": True},
            {"category": "Soin Composite", "name": "Classe 3", "description": "", "has_subcategories": True},
            {"category": "Soin Composite", "name": "Classe 4", "description": "", "has_subcategories": True},
            {"category": "Soin Composite", "name": "Classe 5", "description": "", "has_subcategories": False},
            {"category": "Soin Amalgamme", "name": "Classe 1", "description": "", "has_subcategories": False},
            {"category": "Soin Amalgamme", "name": "Classe 2", "description": "", "has_subcategories": True},
            {"category": "Soin Amalgamme", "name": "Classe 3", "description": "", "has_subcategories": True},
            {"category": "Soin Amalgamme", "name": "Classe 4", "description": "", "has_subcategories": True},
            {"category": "Soin Amalgamme", "name": "Classe 5", "description": "", "has_subcategories": False},
            {"category": "Traitement de racine", "name": "Mono radiculaire", "description": "", "has_subcategories": False},
            {"category": "Traitement de racine", "name": "Pluri radiculaire", "description": "", "has_subcategories": False},
            {"category": "Traitement de racine", "name": "Bi-radiculaire", "description": "", "has_subcategories": False},
            {"category": "Reprise de traitement de racine", "name": "Mono radiculaire", "description": "", "has_subcategories": False},
            {"category": "Reprise de traitement de racine", "name": "Pluri radiculaire", "description": "", "has_subcategories": False},
            {"category": "Reconstitution", "name": "Inlay core", "description": "", "has_subcategories": False},
            {"category": "Reconstitution", "name": "Screw post", "description": "", "has_subcategories": False},
            {"category": "Reconstitution", "name": "Tenon fibré", "description": "", "has_subcategories": False},
            {"category": "Extraction", "name": "Avec suture", "description": "", "has_subcategories": False},
            {"category": "Extraction", "name": "De dent de sagesse", "description": "", "has_subcategories": False},
            {"category": "Extraction", "name": "Simple", "description": "", "has_subcategories": False},
            
            

            {"category": "Avulsions", "name": "Avultion d'une dent ", "description": "", "has_subcategories": False},
            {"category": "Avulsions", "name": "Avultion d'une dent avec séparation d'une racine ou ostéotomie", "description": "", "has_subcategories": False},
            {"category": "Avulsions", "name": "Avultion d'une dent incluse ", "description": "", "has_subcategories": False},
            {"category": "Avulsions", "name": "Avultion d'une dent retenue ", "description": "", "has_subcategories": False},
            {"category": "Avulsions", "name": "Avultion d'une dent temporaire sur arcade", "description": "", "has_subcategories": False},

            {"category": "Avulsions: dents de sagesse", "name": "Coronectomie", "description": "", "has_subcategories": False},
            {"category": "Avulsions: dents de sagesse", "name": "Extraction d'une DDS enclavée", "description": "", "has_subcategories": False},
            {"category": "Avulsions: dents de sagesse", "name": "Extraction d'une DDS horizontale", "description": "", "has_subcategories": False},
            {"category": "Avulsions: dents de sagesse", "name": "Extraction d'une DDS incluse endo osseuse", "description": "", "has_subcategories": False},
            {"category": "Avulsions: dents de sagesse", "name": "Germectomie", "description": "", "has_subcategories": False},
            

            # TODO: Continue from Parodontologie hibahibahibahibahibahibhai

        ]
        for dictionnary in default_subcategories:
            service = DentalService.objects.get(name=dictionnary['category'])
            SubCategoryService.objects.get_or_create(name=dictionnary['name'], description=dictionnary['description'], category=service, has_subcategories=dictionnary['has_subcategories'])

    
@receiver(post_migrate)
def populate_default_subsubcategories(sender, **kwargs):
    if sender.name == 'clinic':  # Replace with your app name
        default_subsubcategories = [
            { "subcategory": "Classe 2", "name": "Distale", "description": ""},
            { "subcategory": "Classe 2", "name": "Mesiale", "description": ""},
            { "subcategory": "Classe 3", "name": "Distale", "description": "",},
            { "subcategory": "Classe 3", "name": "Mesiale", "description": "",},
            { "subcategory": "Classe 4", "name": "Distale", "description": "",},
            { "subcategory": "Classe 4", "name": "Mesiale", "description": "",},
            


            { "subcategory": "Couronne", "name": "Céramo-céramique dento-portée", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-céramique implanto-portée", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-céramique intermédiaire", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-métallique dento-portée", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-métallique implanto-portée", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-métallique intermédiaire", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-zircon dento-portée", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-zircon implanto-portée", "description": "",},
            { "subcategory": "Couronne", "name": "Céramo-zircon intermédiaire", "description": "",},

          
        ]
        for dictionnary in default_subsubcategories:
            subcategory = SubCategoryService.objects.filter(name=dictionnary['subcategory'])
            for s in subcategory:
                SubSubCategoryService.objects.get_or_create(name=dictionnary['name'], description=dictionnary['description'], subcategory=s)
                
        print("Subcategories populated with sexx")
    
@receiver(post_migrate)
def create_teeth(sender, **kwargs):
    if sender.name == 'clinic':
        tooth_codes = [f"{x}{y}" for x in range(1, 5) for y in range(1, 9) if not (x == 2 and y > 8) and not (x == 4 and y > 8)]
        teeth_to_create = [Tooth(code=code) for code in tooth_codes]
        existing_teeth = Tooth.objects.filter(code__in=tooth_codes)
        teeth_to_create = [tooth for tooth in teeth_to_create if tooth.code not in existing_teeth.values_list('code', flat=True)]
        Tooth.objects.bulk_create(teeth_to_create, ignore_conflicts=True)
        print('Snan t3amerou b1')

@receiver(post_migrate)
def fill_data(sender, **kwargs):
    if sender.name == 'clinic':
        create_dummy_data()
        print('dummy data t3amret bang bang glock ta3 ta3 ata3t')


@receiver(post_save, sender=Appointment)
def update_treatment_start_date(sender, instance, **kwargs):
    # Fetch the treatments related to this appointment
    treatments = instance.treatment.all()
    print(treatments)
    
    # Update the start_date of each treatment
    for treatment in treatments:
            treatment.start_date = instance.date
            print(treatment.start_date)
            treatment.save()



@receiver(post_save, sender=Treatment)
def update_treatment_end_date(sender, instance, **kwargs):
    if instance.status in ['D', 'C']:
        instance.end_date = timezone.now().date()
        instance.save()




























# @receiver(pre_save, sender=Payment)
# def payment_created(sender, instance, **kwargs):
#     print(f"Payment detected: {instance}")
#     # Find related appointment
#     appointments = Appointment.objects.filter(
#         patient=instance.patient,
#         treatment=instance.treatment,
#         dentist=instance.dentist,
#         date__gte=timezone.now().date(),  # Assuming date is a date field
#         status='D'
#     )
#     print(appointments)
#     print(f'Dentist: {instance.dentist}, Patient: {instance.patient}')
#     if appointments.exists():
#         appointment = appointments.first()
#         # Set the flag in the appointment
#         appointment.task_terminate_flag = True
#         appointment.save()
        
#         # Access the payment amount
#         payment_amount = instance.amount
#         print(f"Payment amount for the appointment: {payment_amount}")

#     # Perform additional logic here
#     print(f"Payment detected: {instance}")
#     # Implement your post-payment logic here
#     # Check who made the payment and create a notification for the other party

#     # Check if the current user is the patient or the dentist
#     if instance.current_user == instance.dentist:
#         # Create a notification for all receptionists
#         for receptionist in User.objects.filter(role='receptionist'):
#             PaymentNotification.objects.create(user=receptionist, model_id=ContentType.objects.get_for_model(Payment), row_id=instance.id)
#     PaymentNotification.objects.create(user=instance.dentist,model_id=ContentType.objects.get_for_model(Payment), row_id=instance.id)


