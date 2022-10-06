import { useState, useCallback } from 'react'

export default function useSwitchSession() {
    const [currentInstitute, setCurrentInstitute] = useState<string | null>('1')

    const changeInstitute = useCallback((newInstituteId: string) => setCurrentInstitute(newInstituteId), [])

    return { currentInstitute, changeInstitute }
}