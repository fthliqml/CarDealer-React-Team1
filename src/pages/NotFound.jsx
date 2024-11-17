import Container from "@/components/ui/container";

function NotFound() {
  return (
    <>
      <Container
        className={"flex flex-col justify-center items-center gap-y-5"}
      >
        <h1 className="text-3xl font-bold">404 Page Not Found</h1>
        <h2 className="text-xl">Please back to previous page</h2>
      </Container>
    </>
  );
}

export default NotFound;
