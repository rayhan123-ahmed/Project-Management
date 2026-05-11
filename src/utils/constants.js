export const UserRoleEnum = {
    ADMIN : 'admin',
    PROJECT_ADMIN : 'project_admin',
    MEMBER : 'member'
}

export const AvailbleUserRoleEnum = Object.values(UserRoleEnum);

export const TaskStatusEnum = {
    TODO : 'todo',
    IN_PROGRESS : 'in_progress',
    DONE : 'done'
}

export const AvailbleTaskStatusEnum = Object.values(TaskStatusEnum);