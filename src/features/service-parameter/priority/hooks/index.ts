// hooks/usePriority.ts
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { queryClient } from '@/main';
import { deletePriority, fetchPriorityList } from '@/services/actions/priority';
import { Priority } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const usePriority = () => {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [currentData, setCurrentData] = useState<Priority | null>(null);
   const routes = useLinkRoutes();

   // Fetch priorities list
   const { data, isLoading } = useQuery<Priority[]>({
      queryKey: [API_ROUTES.priority.getAll()],
      queryFn: fetchPriorityList,
   });

   // Mutation for deleting a priority
   const deleteMutation = useMutation({
      mutationFn: deletePriority,
      onError: () => {
         console.error('Error deleting priority.');
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.priority.getAll()],
         });
      },
   });

   // Handle delete button click
   const handleDeleteButtonClick = (priority: Priority) => {
      setCurrentData(priority);
      setIsDeleteModalOpen(true);
   };

   // Handle deletion action
   const handleDelete = async () => {
      try {
         if (currentData) {
            await deleteMutation.mutateAsync(currentData.id);
         }
      } finally {
         setIsDeleteModalOpen(false);
      }
   };

   return {
      data,
      isLoading,
      isDeleteModalOpen,
      setIsDeleteModalOpen,
      handleDeleteButtonClick,
      handleDelete,
      deleteMutation,
      currentData,
      routes,
   };
};
