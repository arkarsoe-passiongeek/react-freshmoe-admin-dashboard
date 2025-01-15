import Loading from "@/components/layout/loading";
import { PriorityEditForm } from "./components/priority-edit-form";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPriorityDetail } from "@/services/actions/priority";
import { API_ROUTES } from "@/lib/constants";

const PriorityEditPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [API_ROUTES.priority.view(Number(id))],
    queryFn: async () => await fetchPriorityDetail(Number(id)),
  });

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="bg-c-white border p-10 rounded-md max-w-3xl">
          <PriorityEditForm defaultValues={data} />
        </div>
      )}
    </>
  );
};

export default PriorityEditPage;
