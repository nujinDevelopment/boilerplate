import { ref } from 'vue'

interface Project {
  id?: string
  name: string
  description: string
  owner_id: string
}

interface ProjectsResponse {
  projects: Project[]
}

interface ProjectResponse {
  project: Project
  message?: string
}

export function useProjects() {
  const fetchProjects = async (): Promise<Project[]> => {
    const { projects } = await $fetch<ProjectsResponse>('/api/projects')
    return projects
  }

  const getProject = async (id: string): Promise<Project> => {
    const { project } = await $fetch<ProjectResponse>(`/api/projects/${id}`)
    return project
  }

  const createProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const { project } = await $fetch<ProjectResponse>('/api/projects', {
      method: 'POST',
      body: projectData
    })
    return project
  }

  const updateProject = async (projectData: Project): Promise<Project> => {
    const { project } = await $fetch<ProjectResponse>(`/api/projects/${projectData.id}`, {
      method: 'PUT',
      body: projectData
    })
    return project
  }

  const deleteProject = async (id: string): Promise<void> => {
    await $fetch<{ message: string }>(`/api/projects/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
  }
}
