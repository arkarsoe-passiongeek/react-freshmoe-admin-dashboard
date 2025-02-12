import { createLayer, renderApp, screen } from "@/testing/test-utils";
import { default as LayerRoute } from "../layer";

const renderLayer = async () => {
  const fakeLayer = await createLayer();

  const utils = await renderApp(<LayerRoute />, {
    path: `/layer/:id`,
    url: `/layer/${fakeLayer.id}`,
  });
  await screen.findByText(fakeLayer.name);

  return {
    ...utils,
    fakeLayer
  };
};

test('should render layer', async () => {
  const { fakeLayer } = await renderLayer();
  expect(screen.getByText(fakeLayer.name)).toBeInTheDocument();
});
