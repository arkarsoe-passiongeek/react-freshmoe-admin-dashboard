import { paths } from "@/config/paths";
import { createLayer, renderApp, screen, waitFor } from "@/testing/test-utils";
import { default as LayersRoute } from "../layers";

const renderLayers = async () => {
  const utils = await renderApp(<LayersRoute />, {
    path: paths.layer.path,
    url: paths.layer.path,
  });
  return {
    ...utils,
  };
};

test('should render layers', async () => {
  await renderLayers();
  const createButton = screen.getByRole('link', { name: /create/i });
  const searchInput = screen.getByPlaceholderText(/search/i);

  const fakeLayer = await createLayer();

  expect(createButton).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  waitFor(() => expect(screen.getByText(fakeLayer.name)).toBeInTheDocument());
});
