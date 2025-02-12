import { paths } from "@/config/paths";
import { db } from "@/testing/mocks/db";
import { createLayer, renderApp, screen, userEvent, waitFor } from "@/testing/test-utils";
import { default as LayerEditRoute } from "../edit";

const renderLayerEdit = async () => {
  const fakeLayer = await createLayer();

  const utils = await renderApp(<LayerEditRoute />, {
    path: paths.layer.edit.path,
    url: paths.layer.edit.getHref(fakeLayer.id),
  });

  await screen.findByText(/Layer Information/i);

  return {
    ...utils,
    fakeLayer
  };
};

test('should render layer edit', async () => {
  const { fakeLayer } = await renderLayerEdit()
  const editButton = screen.getByRole('button', { name: /edit/i });

  expect(screen.getByDisplayValue(fakeLayer.name)).toBeInTheDocument();
  expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  expect(editButton).toBeInTheDocument()
});

test('submits the form successfully', async () => {
  const { fakeLayer } = await renderLayerEdit()

  const form = await screen.findByRole('form', { name: /Layer Update Form/i });
  const nameInput = await screen.findByPlaceholderText('Name');
  const consentCheckbox = screen.getByRole('checkbox', { name: 'consent' });
  const editButton = screen.getByRole('button', { name: /edit/i });

  nameInput.focus();
  await userEvent.type(nameInput, '-update');
  await userEvent.type(consentCheckbox, 'true');

  await userEvent.click(editButton);

  await waitFor(() => expect(form).not.toBeInTheDocument());

  const updatedLayer = db.layer.findFirst({ where: { id: { equals: fakeLayer.id } } })
  expect(updatedLayer?.name).toBe(fakeLayer.name + '-update');
})
