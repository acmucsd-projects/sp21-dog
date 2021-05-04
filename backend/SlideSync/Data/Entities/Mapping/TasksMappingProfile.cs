using AutoMapper;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Entities.Responses;

namespace SlideSync.Data.Entities.Mapping {
    public class TasksMappingProfile : Profile {
        public TasksMappingProfile() {
            CreateMap<TaskModel, TaskResponse>();
        }
    }
}