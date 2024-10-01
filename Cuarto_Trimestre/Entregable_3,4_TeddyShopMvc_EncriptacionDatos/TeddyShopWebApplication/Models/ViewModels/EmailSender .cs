namespace TeddyShopWebApplication.Models.ViewModels
{
    using Microsoft.AspNetCore.Identity.UI.Services;
    using System.Threading.Tasks;

    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // Aquí puedes agregar una implementación real o simplemente dejarlo vacío para pruebas.
            // Por ejemplo, se puede hacer un log:
            Console.WriteLine($"Sending email to: {email}, Subject: {subject}");
            Console.WriteLine($"Message: {htmlMessage}");

            // En este caso, devolvemos una tarea completada ya que no envía correos reales.
            return Task.CompletedTask;
        }
    }
}
