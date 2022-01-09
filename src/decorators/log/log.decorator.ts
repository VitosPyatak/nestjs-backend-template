export const Log = (target: Object, _, descriptor: PropertyDescriptor) => {
  const getLoggingAction = (isStarted: boolean) => (isStarted ? 'started' : 'finished');

  const logTemplate = (isStarted: boolean) => {
    console.log(`${target.constructor.name} - ${getLoggingAction(isStarted)} at ${new Date()}`);
  };

  const initialMethod = descriptor.value;
  descriptor.value = async function (...args) {
    logTemplate(true);
    await initialMethod.apply(this, args);
    logTemplate(false);
  };
};
