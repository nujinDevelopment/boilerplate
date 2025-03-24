import { ref } from 'vue'
import { useRequestHeaders } from '#imports'

interface Project {
  id?: string
  name: string
  description: string
}

export function useProjects() {
  const headers = useRequestHeaders()

  const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch('/api/projects', { headers })
    if (!response.ok) {
      throw new Error(await response.text())
    }
    const data = await response.json()
    return data.projects
  }

  const getProject = async (id: string): Promise<Project> => {
    const response = await fetch(`/api/projects/${id}`, { headers })
    if (!response.ok) {
      throw new Error(await response.text())
    }
    const data = await response.json()
    return data.project
  }

  const createProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })
    if (!response.ok) {
      throw new Error(await response.text())
    }
    const data = await response.json()
    return data.project
  }

  const updateProject = async (projectData: Project): Promise<Project> => {
    const response = await fetch(`/api/projects/${projectData.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })
    if (!response.ok) {
      throw new Error(await response.text())
    }
    const data = await response.json()
    return data.project
  }

  const deleteProject = async (id: string): Promise<void> => {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers
    })
    if (!response.ok) {
      throw new Error(await response.text())
    }
  }

  return {
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
  }
}