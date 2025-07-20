import UsersTable from "@/components/admin/UsersTable";
import getAllUsers from "@/lib/db_functions/getAllUsers";

export default async function UsersPage() {
  const res = await getAllUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Users Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <UsersTable users={JSON.stringify(res.users)} />
      </div>
    </div>
  );
}
