namespace TeddyShopWebApplication.Models.ViewModels
{
    public class UserRolesViewModel
    {
        public string? UserId { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}
