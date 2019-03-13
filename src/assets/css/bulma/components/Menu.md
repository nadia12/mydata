``` react
<Menu>
  <Menu.Label>
    General
  </Menu.Label>
  <Menu.List>
    <li><a href="/">Dashboard</a></li>
    <li><a href="/">Customers</a></li>
  </Menu.List>
  <Menu.Label>
    Administration
  </Menu.Label>
  <Menu.List>
    <li><a href="/">Team Settings</a></li>
    <li>
      <a href="/" className="is-active">Manage Your Team</a>
      <Menu.List>
        <li><a href="/">Members</a></li>
        <li><a href="/">Plugins</a></li>
        <li><a href="/">Add a member</a></li>
      </Menu.List>
    </li>
    <li><a href="/">Invitations</a></li>
    <li><a href="/">Cloud Storage Environment Settings</a></li>
    <li><a href="/">Authentication</a></li>
  </Menu.List>
  <Menu.Label>
    Transactions
  </Menu.Label>
  <Menu.List>
    <li><a href="/">Payments</a></li>
    <li><a href="/">Transfers</a></li>
    <li><a href="/">Balance</a></li>
  </Menu.List>
</Menu>
```