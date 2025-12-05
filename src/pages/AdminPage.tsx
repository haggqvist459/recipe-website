import { useEffect, useState } from "react";
import { PageContainer } from "@/components";
import EditRecipePage from './EditRecipePage'

const AdminPage = () => {

  return (
    <PageContainer>
      <EditRecipePage />
    </PageContainer>
  );
}

export default AdminPage;

