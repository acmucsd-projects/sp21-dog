using AutoMapper;
using SlideSync.Data.Entities.Dto;

namespace SlideSync.Data.Entities.Profiles {
    public class UsersProfile : Profile {
        public UsersProfile() {
            CreateMap<UserRegistrationDto, UserModel>()
                .ForMember(user => user.Password, opt => opt.Ignore());
        }
    }
}