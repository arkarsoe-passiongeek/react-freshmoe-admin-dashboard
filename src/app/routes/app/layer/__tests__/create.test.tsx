import { db } from "@/testing/mocks/db";
import { renderApp, screen, userEvent } from "@/testing/test-utils";
import { default as LayerCreateRoute } from "../create";

const renderLayerCreate = async () => {
  const utils = await renderApp(<LayerCreateRoute />, {
    path: `/layer/create`,
    url: `/layer/create`,
  });
  await screen.findByText(/Layer Information/i);

  return {
    ...utils,
  };
};

test('should render layer create', async () => {
  await renderLayerCreate()
  const nameInput = await screen.findByPlaceholderText('Name');

  nameInput.focus();
  await userEvent.type(nameInput, 'New Layer');

  expect((nameInput as HTMLInputElement).value).toBe('New Layer');

  // Check for the buttons
  const cancelButton = screen.getByRole('button', { name: /Cancel/i });
  const createButton = screen.getByRole('button', { name: /Create/i });

  expect(cancelButton).toBeInTheDocument();
  expect(createButton).toBeInTheDocument();
});

test('should layer create and show success dialog', async () => {
  await renderLayerCreate()
  const nameInput = await screen.findByPlaceholderText('Name');

  nameInput.focus();
  await userEvent.type(nameInput, 'New Layer');

  // Check for the buttons
  const createButton = screen.getByRole('button', { name: /Create/i });

  expect(createButton).toBeInTheDocument();
  await userEvent.click(createButton);

  const successDialog = await screen.findByRole('dialog', { name: /Success/i });
  expect(successDialog).toBeInTheDocument();

  const layers = db.layer.getAll();
  expect(layers.length).toBe(1);
});
