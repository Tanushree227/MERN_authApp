/* eslint-disable react/no-unescaped-entities */
import Card from "../components/ui/Card";

function About() {
  return (
    <Card>
      <div className="text-center p-5 px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-center font-bold">About EchoHub</h1>
      <p className="mb-4">
        EchoHub is a dynamic and user-centric platform designed to foster a
        global community where individuals can share their diverse experiences
        and insights with a wide audience. Users on EchoHub have the opportunity
        to create and publish posts, sharing anything they have encountered or
        experienced in the world. Whether it's personal stories, travel
        adventures, life lessons, or unique perspectives, EchoHub encourages
        users to contribute their narratives.
      </p>
      <br />
      <p>
        The platform's user-friendly interface allows members to engage with
        each other by liking posts that resonate with them, creating a positive
        and supportive environment. With millions of users, EchoHub serves as a
        hub for a myriad of experiences, creating a rich tapestry of stories
        from around the globe.
      </p>
      <br />
      <p>
        EchoHub aims to not only provide a space for self-expression but also to
        connect individuals through shared experiences, fostering a sense of
        community and understanding. The platform's interactive features enable
        users to engage in meaningful conversations, exchange ideas, and build
        connections with people who have similar interests or have undergone
        similar experiences.
      </p>
      <br />
      <p>
        <i><strong>
          In summary, EchoHub is a global sharing platform that empowers users
          to share their unique stories and perspectives with a vast audience,
          creating a virtual community where individuals can connect,
          appreciate, and support each other's experiences.
          </strong></i>
      </p>
      </div>
    </Card>
  );
}

export default About;
