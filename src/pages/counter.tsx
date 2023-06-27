import { GetServerSideProps } from "next";

export default function CounterPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
