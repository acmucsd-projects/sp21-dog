using AutoMapper;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Entities.Requests;
using SlideSync.Data.Entities.Responses;

namespace SlideSync.Data.Entities.Mapping {
    public class UsersMappingProfile : Profile {
        public UsersMappingProfile() {
            CreateMap<UserRegistrationRequest, UserModel>()
                .ForMember(user => user.Password, opt => opt.Ignore());
            CreateMap<UserModel, UserProfileResponse>();
            CreateMap<UserEditRequest, UserModel>();
        }
    }
}