import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      token
      userId
      role
    }
  }
`;

export const REGISTER = gql`
  mutation Register($payload: RegisterInput) {
    Register(payload: $payload) {
      _id
      name
      imageUrl
      email
      status
      password
      role
      Coach {
        _id
        name
        sport
        Users {
          _id
          name
          imageUrl
          email
          status
          password
          role
        }
        locationId
        email
        imageUrl
        usersCoach {
          _id
          name
          imageUrl
          email
          status
          password
          role
        }
        Schedule {
          _id
          sport
          duration
          decription
        }
      }
      Schedules {
        _id
        sport
        duration
        decription
        Coachs {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Category {
          _id
          name
          logo
          marker
        }
      }
    }
  }
`;

export const GET_PROFILE_USER = gql`
  query GetUserById {
    getUserById {
      _id
      name
      imageUrl
      email
      status
      password
      role
      Coach {
        _id
        name
        sport
        Users {
          _id
          name
          imageUrl
          email
          status
          password
          role
        }
        locationId
        email
        imageUrl
        usersCoach {
          _id
          name
          imageUrl
          email
          status
          password
          role
        }
        Schedule {
          _id
          sport
          duration
          decription
        }
      }
      Schedules {
        _id
        sport
        duration
        decription
        Coachs {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Category {
          _id
          name
          logo
          marker
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
    getAllCategory {
      _id
      name
      logo
      marker
    }
  }
`;

export const GET_ALL_LOCATION = gql`
  query GetAllLocation {
    getAllLocation {
      _id
      name
      Coachs {
        _id
        name
        sport
        Users {
          _id
          name
          imageUrl
          email
          status
          password
          role
          Coach {
            _id
            name
            sport
            locationId
            email
            imageUrl
          }
          Schedules {
            _id
            sport
            duration
            decription
          }
        }
        locationId
        email
        imageUrl
      }
      CategoryId
      Category {
        _id
        name
        logo
        marker
      }
      imageUrl
      longitude
      latitude
      address
    }
  }
`;

export const GET_ALL_LOCATION_BY_CATEGORY = gql`
  query GetLocationByCategory($categoryId: ID) {
    getLocationByCategory(CategoryId: $categoryId) {
      _id
      name
      Coachs {
        _id
        name
        sport
        Users {
          _id
          name
          imageUrl
          email
          status
          password
          role
          Coach {
            _id
            name
            sport
            locationId
            email
            imageUrl
          }
          Schedules {
            _id
            sport
            duration
            decription
          }
        }
        locationId
        email
        imageUrl
      }
      CategoryId
      Category {
        _id
        name
        logo
        marker
      }
      imageUrl
      longitude
      latitude
      address
    }
  }
`;

export const GET_SCHEDULE_BY_SPORT = gql`
  query GetScheduleBySport($sport: String, $coachId: String) {
    getScheduleBySport(sport: $sport) {
      _id
      sport
      duration
      decription
      Coachs {
        _id
        name
        sport
        Users {
          _id
          name
          imageUrl
          email
          status
          password
          role
          Coach {
            _id
            name
            sport
            locationId
            email
            imageUrl
          }
          Schedules {
            _id
            sport
            duration
            decription
          }
        }
        locationId
        email
        imageUrl
        usersCoach {
          _id
          name
          imageUrl
          email
          status
          password
          role
        }
        Schedule {
          _id
          sport
          duration
          decription
        }
      }
      Category {
        _id
        name
        logo
        marker
      }
    }
    getCoachById(coachId: $coachId) {
      _id
      name
      sport
      Users {
        _id
        name
        imageUrl
        email
        status
        password
        role
        Coach {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Schedules {
          _id
          sport
          duration
          decription
        }
      }
      locationId
      email
      imageUrl
      usersCoach {
        _id
        name
        imageUrl
        email
        status
        password
        role
      }
      Schedule {
        _id
        sport
        duration
        decription
        Coachs {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Category {
          _id
          name
          logo
          marker
        }
      }
    }
  }
`;

export const ADD_USER_SCHEDULE = gql`
  mutation AddNewUserSchedule($payload: AddUserSchedule) {
    AddNewUserSchedule(payload: $payload) {
      _id
      UserId
      CoachId
      ScheduleId
      startDate
      endDate
      roomChatId
      LocationId
      CategoryId
    }
  }
`;

export const GET_ONE_USER = gql`
  query GetCoachById($coachId: String, $userId: String) {
    getCoachById(coachId: $coachId) {
      _id
      name
      sport
      Users {
        _id
        name
        imageUrl
        email
        status
        password
        role
        Coach {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Schedules {
          _id
          sport
          duration
          decription
        }
      }
      locationId
      email
      imageUrl
      usersCoach {
        _id
        name
        imageUrl
        email
        status
        password
        role
      }
      Schedule {
        _id
        sport
        duration
        decription
        Coachs {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Category {
          _id
          name
          logo
          marker
        }
      }
    }
    getUserByIdArgs(userId: $userId) {
      _id
      name
      imageUrl
      email
      status
      password
      role
      Coach {
        _id
        name
        sport
        Users {
          _id
          name
          imageUrl
          email
          status
          password
          role
        }
        locationId
        email
        imageUrl
        usersCoach {
          _id
          name
          imageUrl
          email
          status
          password
          role
        }
        Schedule {
          _id
          sport
          duration
          decription
        }
      }
      Schedules {
        _id
        sport
        duration
        decription
        Coachs {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Category {
          _id
          name
          logo
          marker
        }
      }
    }
  }
`;

export const GET_PROFILE_COACH = gql`
  query GetProfileCoach {
    getProfileCoach {
      _id
      name
      imageUrl
      email
      password
      role
      coachUser {
        _id
        name
        imageUrl
        email
        status
        password
        role
        Coach {
          _id
          name
          sport
          Users {
            _id
            name
            imageUrl
            email
            status
            password
            role
          }
          locationId
          email
          imageUrl
          usersCoach {
            _id
            name
            imageUrl
            email
            status
            password
            role
          }
          Schedule {
            _id
            sport
            duration
            decription
          }
        }
        Schedules {
          _id
          sport
          duration
          decription
        }
      }
      UserSchedules {
        _id
        sport
        duration
        decription
        Coachs {
          _id
          name
          sport
          locationId
          email
          imageUrl
        }
        Category {
          _id
          name
          logo
          marker
        }
      }
      UsersJoin {
        _id
        name
        imageUrl
        email
        status
        password
        role
      }
    }
  }
`;
