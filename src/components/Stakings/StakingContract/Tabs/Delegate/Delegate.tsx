import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { Form, DropdownButton, Dropdown, Alert, Button, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';
import { isValidAmountInput } from '../../../../../utils';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
};

type State = {
  platform: string;
  delegateeInput: string;
  amountInput: string;
  monthsInput: string;
  displayMesssage: string;
  spinner: boolean;
};

export class Delegate extends Component<Props, State> {
  state: State = {
    platform: '',
    delegateeInput: '',
    amountInput: '',
    monthsInput: '',
    displayMesssage: '',
    spinner: false,
  };

  delegate = async () => {
    this.setState({ spinner: true });
    try {
      await this.props.instance.delegate(
        this.state.platform,
        this.state.delegateeInput,
        ethers.utils.parseEther(this.state.amountInput),
        this.state.monthsInput.split(' ').join('').split(',')
      );
      this.setState({ spinner: false, displayMesssage: 'Success' });
    } catch (error) {
      this.setState({
        displayMesssage: `Error from smart contract: ${error.message}`,
        spinner: false,
      });
    }
  };

  render() {
    const isValidMonths = (input: string) => {
      const results = input.split(' ').join('').split(',').map(isValidAmountInput);
      return !results.filter((result) => !result).length;
    };

    return (
      <>
        <h3>Delegate</h3>

        <DropdownButton
          id="dropdown-basic-button"
          variant="secondary"
          title={this.state.platform || 'Select platform'}
        >
          <Dropdown.Item
            onClick={() => this.setState({ platform: window.validatorManagerInstance.address })}
          >
            Validator Manager {window.validatorManagerInstance.address}
          </Dropdown.Item>
        </DropdownButton>

        <Form.Control
          onChange={(event) => this.setState({ delegateeInput: event.target.value })}
          value={this.state.delegateeInput}
          type="text"
          placeholder="Enter Delegatee Address"
          style={{ width: '325px' }}
          autoComplete="off"
          isValid={!!this.state.delegateeInput && ethers.utils.isAddress(this.state.delegateeInput)}
          isInvalid={
            !!this.state.delegateeInput && !ethers.utils.isAddress(this.state.delegateeInput)
          }
        />

        <Form.Control
          onChange={(event) => this.setState({ amountInput: event.target.value })}
          value={this.state.amountInput}
          type="text"
          placeholder="Enter Amount to delegate"
          style={{ width: '325px' }}
          autoComplete="off"
          isValid={!!this.state.amountInput && isValidAmountInput(this.state.amountInput)}
          isInvalid={!!this.state.amountInput && !isValidAmountInput(this.state.amountInput)}
        />

        <Form.Control
          onChange={(event) => this.setState({ monthsInput: event.target.value })}
          value={this.state.monthsInput}
          type="text"
          placeholder="Enter Months e.g. 4,5,6"
          style={{ width: '325px' }}
          autoComplete="off"
          isValid={!!this.state.monthsInput && isValidMonths(this.state.monthsInput)}
          isInvalid={!!this.state.monthsInput && !isValidMonths(this.state.monthsInput)}
        />

        {this.state.displayMesssage ? (
          <Alert variant="info">{this.state.displayMesssage}</Alert>
        ) : null}

        <Button onClick={this.delegate} disabled={this.state.spinner}>
          {this.state.spinner ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: '2px' }}
            />
          ) : null}
          {this.state.spinner ? 'Delegating...' : 'Delegate'}
        </Button>
      </>
    );
  }
}