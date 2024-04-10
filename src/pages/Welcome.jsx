import WelcomeSection from '../components/WelcomeSection';

const Welcome = (props) => {
  return (
    <section className="flex">
      <div className="w-full xl:w-8/12">
        <WelcomeSection user={props.user} />
      </div>
    </section>
  );
};

export default Welcome;
