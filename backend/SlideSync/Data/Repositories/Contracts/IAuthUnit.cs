namespace SlideSync.Data.Repositories.Contracts {
    public interface IAuthUnit {
        ITokenRepository Tokens { get; }
        IUserRepository Users { get; }
        int Complete();
    }
}