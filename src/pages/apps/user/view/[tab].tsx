// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next/types";

// ** Third Party Imports
import axios from "axios";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";

// ** Demo Components Imports
import UserViewPage from "src/views/apps/user/view/UserViewPage";

const UserView = ({ tab, invoiceData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <UserViewPage tab={tab} invoiceData={invoiceData} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const invoiceData: InvoiceType[] = [];

  return {
    props: {
      invoiceData,
      tab: params?.tab,
    },
  };
};

export default UserView;
